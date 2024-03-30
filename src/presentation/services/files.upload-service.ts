import path from "path";
import fs from 'fs'
import { UploadedFile } from "express-fileupload";
import { customError } from "../../domain";
import { UuidAdapter } from "../../config";


export class FileUploadService {

    constructor() { }


    //
    private checkFolder(folderPath: string) {

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


    }

    public async uploadSingleFile(file: UploadedFile,
        folder: string = 'uploads',
        validExtension: string[] = ['png', 'jpg', 'jpeg', 'gif']) {

        try {

            const fileExtension = file.mimetype.split('/').at(1) ?? '' //agarramos la extension

            if (!validExtension.includes(fileExtension)) { //validamos la extension

                throw customError.badRequest(`Invalid extension ${fileExtension}, valid ones ${validExtension}`)
            }

            const destination = path.resolve(__dirname, '../../../', folder) //ruta hasta el destino

            this.checkFolder(destination) //validamos si existe el folder

            let fileName = `${UuidAdapter.v4()}.${fileExtension}` //nombre del archivo

            file.mv(`${destination}/${fileName}`) //movemos con la funcion mv  al destino

            return { fileName }

        } catch (error) {

            console.log(error)

            throw error
        }


    }

    public async uploadMultipleFiles(files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {

            const Files = await Promise.all(

                files.map( files => this.uploadSingleFile(files, folder, validExtensions) )

            ); 

            return Files




    }



}