import Cookies from "js-cookie";

export async function fetchApiPrivate<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: T
): Promise<{ data?: unknown; status: number; error?: string }> {
  const token = Cookies.get("authToken");

  if (!token) {
    console.error("No auth token available");
    return { status: 401, error: "Authentication required" };
  }

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  if (method === "GET") {
    delete config.body;
  }

  try {
    const response = await fetch(`/api/${endpoint}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown API error");
    }
    return { data, status: response.status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("API call failed:", error.message);
    return {
      status: error.status || 500,
      error: error.message || "Unknown error occurred",
    };
  }
}
