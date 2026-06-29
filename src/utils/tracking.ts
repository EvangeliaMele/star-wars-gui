/*
 * Tracking utility — sends events to the internal /api/track endpoint
 * which forwards them to Grafana Loki for visualization.
 * Builds a lightweight OpenTelemetry-shaped payload without using the OTel SDK.
*/

const OTLP_ENDPOINT = "/api/track";
export const trackEvent = async (
  eventName: string,
  attributes: Record<string, string> = {},
) => {
  try {
    const now = Date.now();

    // Build an OTel-compatible payload manually
    const body = {
      resourceSpans: [
        {
          resource: {
            attributes: [
              {
                key: "service.name",
                value: { stringValue: "star-wars-gui" },
              },
            ],
          },
          scopeSpans: [
            {
              spans: [
                {
                  traceId: crypto.randomUUID().replace(/-/g, ""),
                  spanId: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
                  name: eventName,
                  startTimeUnixNano: String(now * 1_000_000),
                  endTimeUnixNano: String((now + 1) * 1_000_000),

                  // Map event attributes to OTel format
                  attributes: Object.entries(attributes).map(
                    ([key, value]) => ({
                      key,
                      value: { stringValue: value },
                    }),
                  ),
                },
              ],
            },
          ],
        },
      ],
    };

    await fetch(OTLP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("Tracking error:", e);
  }
};

