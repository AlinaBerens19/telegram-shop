// Desc: This hook is used to encrypt and decrypt the data
import * as crypto from 'crypto';
require("dotenv").config()


export function useCrypto() {

    const hexStringToBuffer = (hexString: string): Buffer => {
        // Remove any spaces from the hex string
        const cleanedHexString = hexString.replace(/\s/g, '');
        
        // Convert the cleaned hex string to a Buffer
        const buffer = Buffer.from(cleanedHexString, 'hex');

        if (buffer.length !== 16) {
            throw new Error('Invalid key length. The key should be 16 bytes (128 bits) long.');
        }

        console.log(`buffer: ${buffer}`);
    
        return buffer;
    };

    const my_secret_key: string | undefined = process.env.NEXT_PUBLIC_MY_SECRET_KEY!;
    const bufferKey: Buffer = hexStringToBuffer(my_secret_key!)

    const validateAndEncrypt = (input: string): { value: string; iv: string } => {
        // Example: Ensure the input is a non-empty string
        if (typeof input !== 'string' || input.trim() === '') {
            throw new Error('Input must be a non-empty string.');
        }

        // Example: Generate a random initialization vector (IV)
        const iv = crypto.randomBytes(16);

        try {
            // Now `bufferKey` is a Buffer containing the binary data of the hexadecimal string.
            const cipher = crypto.createCipheriv('aes-128-cbc', bufferKey, iv);
            console.log(`cipher: ${cipher}`);

            // Example: Encrypt the input and IV
            let encryptedValue = cipher.update(input, 'utf-8', 'hex');
            encryptedValue += cipher.final('hex');

            console.log(`encryptedValue: ${encryptedValue.toString()}`);

            return {
                value: encryptedValue.toString(),
                iv: iv.toString('hex'),
            };
        }
        catch (e) {
            console.log(`Error encrypting value: ${e}`);
            return {
                value: '',
                iv: '',
            };
        }

    };



    const validateAndDecrypt = (encryptedValue: string, iv: string): string => {
        try {
            if (bufferKey.length !== 16) {
                throw new Error('(IN DECRIPTION) Invalid key length. The key should be 16 bytes (128 bits) long.');
            }
    
            // Ensure the encrypted value has the correct length for AES-128
            if (encryptedValue.length % 2 !== 0) {
                throw new Error('Invalid encrypted value length.');
            }
    
            // Check if the IV length is 16 bytes
            if (Buffer.from(iv, 'hex').length !== 16) {
                throw new Error('Invalid IV length. It should be 16 bytes (128 bits) long.');
            }
            const decipher = crypto.createDecipheriv('aes-128-cbc', bufferKey, Buffer.from(iv, 'hex'));
    
            // Example: Decrypt the value
            let decryptedValue = decipher.update(encryptedValue, 'hex', 'utf-8');
            decryptedValue += decipher.final('utf-8');
    
            console.log(`decryptedValue: ${decryptedValue}`);
    
            return decryptedValue;
        } catch (error) {
            // Handle decryption errors here
            console.error(`Decryption Error: ${error}`);
            throw new Error('Failed to decrypt the value');
        }
    };

    return {
        validateAndEncrypt,
        validateAndDecrypt
    }   
}
