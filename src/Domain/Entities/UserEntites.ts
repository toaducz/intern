import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
}

export const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {type: String, required: true},
    roleId: {
        type: Types.ObjectId, ref: 'RoleWithBase', validate: {
            validator: isValidObjectId
        }
    },
    companyId: {
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId
        }
    },
    fullname: {type: String},
    typeOfWork: {type: String},
    careerGoal: {type: String},
    gender: {type: Boolean},
    languageLevel: {type: String},
    graduationTime: {type: Date},
    hometown: {type: String},
    education: {type: String},
    imagePath: {type: String},
    birthday: {type: Date},
    phoneNumber: {type: String},
    email: {type: String},
    studentId: {type: String}
})
const UserWithBaseSchema = new mongoose.Schema({
    ...User.obj,
    ...BaseSchema.obj
})

export const UserWithBase = mongoose.model('UserWithBase', UserWithBaseSchema, 'users')
