import {hashSync, genSaltSync, compareSync} from 'bcryptjs'

export const bcryptAdapter = {

    hash: (password: string) => {

        const salt = genSaltSync()

        return hashSync(password, salt)

    },


    compare: (password: string, hashPassword: string) => {

        return compareSync(password, hashPassword)

    }

}