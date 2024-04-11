"use client";

export function BeamAnalytics() {
	const token = "0af6c453-8294-4aed-a6ca-ff769bb83df2";
	if (!token) {
		return null;
	}
	return (
		<script
			src="https://beamanalytics.b-cdn.net/beam.min.js"
			data-token={token}
			async
		/>
	);
}
