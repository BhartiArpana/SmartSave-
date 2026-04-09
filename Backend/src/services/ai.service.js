import {ChatMistralAI} from '@langchain/mistralai'
import {HumanMessage, SystemMessage} from 'langchain'

const model = new ChatMistralAI({
model: "mistral-small-latest",
apiKey:process.env.MISTRAL_API_KEY
});

export async function generateFolder({link,description, title, type}){

    const inputData = { link, description, title, type };

  const filteredData = Object.fromEntries(
    Object.entries(inputData).filter(([_, v]) => v)
  );

   const response = await model.invoke([
    new SystemMessage(`Role Folder Creator
Task Create a folder name based on the content type

Rule Always prefer type over topic
Rule If type is provided, strictly use it
Rule If content is long text/article/blog → return "article"
Rule If youtube/video → return "video"
Rule If pdf → return "pdf"
Rule If image → return "image"
Rule If website link → return "website"

Rule Use exactly 1 to 2 words
Rule Output only the folder text
Rule No extra words or punctuation`),
 new HumanMessage(`
Generate a folder name for:
${JSON.stringify(filteredData)}
    `)
   ])
     return response.content;
}