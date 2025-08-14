import dbconnect from '@/lib/dbconnect';
import ColorPalletModel from '@/model/colorPallet';
import { colorPallet } from '@/schemas/colorPalletSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('POST request received'); // check
    const { name, types, colors } = await request.json();
    try {
    const ZodValidation =  colorPallet.safeParse({ name, types, colors });
    if (!ZodValidation.success) {
        return NextResponse.json(
            {
                success: false,
                message: 'Zod check failed: Invalid data', //TODO check later remove "Zod check failed"
                errors: ZodValidation.error.flatten().fieldErrors,
            },
            { status: 400 },
        );
    }
    await dbconnect();
        const IsNameTaken = await ColorPalletModel.findOne({
            name,
        });
        if (IsNameTaken) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Color palette with this name already exists',
                },
                { status: 409 },
            );
        }
        const IsPalletExists = await ColorPalletModel.findOne({
            colors,
        });
        if (IsPalletExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Color palette with these colors already exists',
                },
                { status: 409 },
            );
        }
        if(types.length === 0) {
            types.push("randomPallet");
        }
        const newColorPallet = new ColorPalletModel({
            name,
            types,
            colors,
        });
        
        await newColorPallet.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Color palette created successfully',
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error('Error creating color palette: error block', error);
        return NextResponse.json(
            {
                success: false,
                message: 'error block: Failed to create color palette+ ' ,  //TODO: Remove "error block"
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            {
                status: 500,
            },
        );
    }
}

// interface Colors {
//     red: number;
//     green: number;
//     blue: number;
// }

// interface Params {
//     name?: string;
//     types?: string[];
//     Colors;
// }

// export async function GET(request: NextRequest , {params} : {params: Params}) {

// }
