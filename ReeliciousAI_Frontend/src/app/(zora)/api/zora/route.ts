import {
  account,
  createCoinMetadata,
  publicClient,
  thumbFile,
  walletClient,
} from "@/lib/zora";
import {
  createCoin,
  DeployCurrency,
  validateMetadataURIContent,
  ValidMetadataURI,
} from "@zoralabs/coins-sdk";
import { NextRequest } from "next/server";
import { base } from "viem/chains";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const videoResponse = await fetch(data.compiledUrl as string);

  const blob = await videoResponse.blob();

  const videoFile = new File([blob], "Video 1", {
    type: "video/mp4",
  });

  try {
    // 1. Create and upload metadata
    const metadata = await createCoinMetadata({
      videoFile: videoFile,
      thumbnailFile: thumbFile,
    });
    console.log("✅ Got metadata:", metadata);
    console.log("URI:", metadata.uri);

    // 2. Validate metadata content
    await validateMetadataURIContent(metadata.uri);
    console.log("✅ Metadata URI content is valid.");

    // 3. Define coin parameters
    const coinParams = {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri as ValidMetadataURI,
      payoutRecipient: account.address, // Set payout recipient to the creator's address
      currency: DeployCurrency.ZORA,
      chainId: base.id,
    } as const;

    console.log("Creating coin with params:", coinParams);

    // 4. Create the coin on-chain
    const result = await createCoin(coinParams, walletClient, publicClient);

    console.log("✅ Coin created successfully!");
    console.log("Transaction hash:", result.hash);
    console.log("Coin address:", result.address);
    console.log("Deployment details:", result.deployment);
    return Response.json({
        "coin_address": result.address,
        "meta_data_uri":metadata.uri
    })
  } catch (error) {
    console.error("❌ Error creating coin:", error);
    return Response.json({
        "error":"Couldn't post"
    })
  }
}
