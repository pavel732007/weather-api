export async function request<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error("Error:" + error);
    throw error;
  }
}
