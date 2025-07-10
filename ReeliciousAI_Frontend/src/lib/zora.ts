import { Address } from "viem";
import {
  createMetadataBuilder,
  DeployCurrency,
  createZoraUploaderForCreator,
  setApiKey,
  CreateMetadataParameters,
  validateMetadataURIContent,
  createCoin,
  ValidMetadataURI,
} from "@zoralabs/coins-sdk";
import * as fs from "fs";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, createPublicClient, http } from "viem";
import { base } from "viem/chains";

// Load environment variables from .env file
const zoraKey = process.env.ZORA_API_KEY;
const privateKey = process.env.ZORA_PRIVATE_KEY;

// Validate that the required environment variables are set
if (!privateKey) {
  throw new Error("PRIVATE_KEY not found in .env file. Please add it.");
}

if (!zoraKey) {
  throw new Error("ZORA_KEY not found in .env file. Please add it.");
}

// Set Zora API key
setApiKey(zoraKey);

// Create an account from the private key
export const account = privateKeyToAccount(
  privateKey.startsWith("0x") ? (privateKey as `0x${string}`) : `0x${privateKey}`
);

/**
 * Creates metadata for a new coin, including uploading media to IPFS.
 * @param videoFile The video file for the coin's media.
 * @param thumbnailFile The thumbnail image for the coin.
 * @returns The created metadata parameters.
 */
export async function createCoinMetadata({
  videoFile,
  thumbnailFile,
}: {
  videoFile: File;
  thumbnailFile: File;
}): Promise<CreateMetadataParameters> {
  console.log("Building and uploading metadata...");

  const { createMetadataParameters } = await createMetadataBuilder()
    .withName("Satoshi Coin")
    .withSymbol("SAT")
    .withDescription(
      "A coin dedicated to the mysterious creator of Bitcoin, Satoshi Nakamoto."
    )
    .withMedia(videoFile)
    .withImage(thumbnailFile)
    .upload(createZoraUploaderForCreator(account.address as Address));

  console.log("✅ Metadata created successfully!");
  return createMetadataParameters;
}


// --- Viem Clients Setup ---
export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(),
});

const thumbFileName = "satoshi.JPG";
const thumbFileBuffer = fs.readFileSync(process.cwd() +`/public/${thumbFileName}`);
export const thumbFile = new File([thumbFileBuffer], thumbFileName, {
  type: "image/jpeg",
});