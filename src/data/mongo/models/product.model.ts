import {Schema, model} from 'mongoose'


const productSchema = new Schema({

    name: {
        type:String,
        required: [true, 'Name is required'],
        unique: true
    },

    available: {

        type: Boolean,
        default: true
    },

    price: {
        type: Number,
        default: 0,
        required: [true, 'Price is required']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },


    //hacemos referencia a los otros modelos
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {

        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

})

//como quiero ver mi data
productSchema.set('toJSON', {

    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        
    }
})



export const productModel = model('Product', productSchema)