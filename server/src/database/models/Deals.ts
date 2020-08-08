import mongoose, { Document } from 'mongoose'

import db from '../credentials'

mongoose.connect('mongodb+srv://' + db.user + ':' + db.pswd + '@' + db.url + '/' + db.dtbs + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

interface IDeals {
    deck: string[]
    hand: string[]
}
interface IDealsDoc extends Document, IDeals {}

const DealsSchema = new mongoose.Schema({
    deck: [String],
    hand: [String]
})

export default mongoose.model<IDealsDoc>('Deals', DealsSchema )
