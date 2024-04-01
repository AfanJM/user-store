import { Schema, model } from 'mongoose'

const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },

    available: {

        type: Boolean,
        default: false
    },

    //hacemos referencia a los otros modelos
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }



})

categorySchema.set('toJSON', {

    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        
        delete ret._id;
        delete ret.__v;
    },        

})


export const categoryModel = model('Category', categorySchema)