import { getFrameHtmlResponse } from "@coinbase/onchainkit"
import { NextRequest, NextResponse } from "next/server"

const getFrame = (req) => {
  console.log("SWEETS FRAME", req.body)
  return { data: req.body }
}

export default async function handler(req: NextRequest): Promise<Response> {
  const { data } = await getFrame(req)
  return new NextResponse(
    // Step 3. Use getFrameHtmlResponse to create a Frame response
    getFrameHtmlResponse({
      buttons: [
        {
          label: `We love BOAT`,
        },
      ],
      image: "https://build-onchain-apps.vercel.app/release/v-0-17.png",
      postUrl: "http://localhost:3000/api/frames",
    }),
  )
}
