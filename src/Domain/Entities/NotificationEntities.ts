import mongoose, { Types } from 'mongoose';
import { BaseSchema } from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const Notification = new mongoose.Schema({
    userId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        },
        default: '666bf5e7ae57ee0d95c4f670',
    },
    title:{
        type: String,
        default: 'default',
    },
    message:{
        type: String,
        default: 'default',
    },
    isRead:{
        type: Boolean,
        default: false,
    }
})

const NotificationWithBaseSchema = new mongoose.Schema({
    ...Notification.obj,
    ...BaseSchema.obj
})

export const NotificationWithBase = mongoose.model('NotificationWithBase', NotificationWithBaseSchema, 'notifications')