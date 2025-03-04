import {AssistantResponse} from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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',
    organization: 'org-xblRS91HsMYeNmleQpb4VlnE'
});

export const config = {
    api: {
        bodyParser: false,
    },
};
export const runtime = 'edge';


export default async function POST(
    req: Request,
) {


    const input: {
        threadId: string | null;
        message: string;
    } = await req.json();

    const thread =
        input.threadId || (await openai.beta.threads.create({})).id;
    const userMessage = await openai.beta.threads.messages.create(thread, {
        role: 'user',
        content: input.message,
    });
    console.log(JSON.stringify(userMessage, null, 2));
    const assistants =await openai.beta.assistants.list();
    console.log(JSON.stringify(assistants.data, null, 2));

    return AssistantResponse(
        {threadId: thread, messageId: userMessage.id},
        async ({forwardStream, sendDataMessage}) => {
            const runStream = openai.beta.threads.runs.stream(thread, {
                assistant_id:
                    process.env.ASSISTANT_ID ??
                    (() => {
                        throw new Error('ASSISTANT_ID is not set');
                    })(),
            });
            // await openai.beta.threads.runs.createAndPoll(thread, {assistant_id: process.env.ASSISTANT_ID ?? '',});

            let runResult = await forwardStream(runStream);
            console.log(JSON.stringify(runResult, null, 2));

            while (
                runResult?.status === 'requires_action' &&
                runResult.required_action?.type === 'submit_tool_outputs'
                ) {
                const toolOutputs = runResult.required_action.submit_tool_outputs.tool_calls.map(
                    (toolCall: any) => {
                        const parameters = JSON.parse(toolCall.function.arguments);
                        switch (toolCall.function.name) {
                            // configure your tool calls here

                            default:
                                throw new Error(
                                    `Unknown tool call function: ${toolCall.function.name}`,
                                );
                        }
                    }
                );

                runResult = await forwardStream(
                    openai.beta.threads.runs.submitToolOutputsStream(
                        thread,
                        runResult.id,
                        {tool_outputs: toolOutputs}
                    )
                );
            }
        }
    );

}
