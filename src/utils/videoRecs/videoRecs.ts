import openai from "../../lib/openAI";

/**
 *
 * @param { Video[] } videoList list of video titles
 */
export const videoRecs = async (videoList: string[]) => {
  let prompt = "generate 5 genres based on: ";

  for (const videoTitle of videoList) {
    prompt += `\n${videoTitle},`;
  }

  const schema = {
    type: "object",
    properties: {
      genres: {
        type: "array",
        description: "An array of genres",
        items: { type: "string" },
      },
    },
  };

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      { role: "user", content: prompt },
    ],
    functions: [{ name: "set_genres", parameters: schema }],
    function_call: { name: "set_genres" },
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
  });

  const videoURLs = chatCompletion.choices[0].message.function_call?.arguments;

  if (!videoURLs) throw new Error("Function call resulted in no response");

  console.log(JSON.parse(videoURLs));

  console.log(chatCompletion);
};
