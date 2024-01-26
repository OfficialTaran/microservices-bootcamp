import Schema from 'validate'
import { timestampValidator } from '../validators.mjs'

const shipments = new Schema({
  id: {
    type: String
  },
  date_received: {
    type: String,
    required: true,
    use: { timestampValidator }
  },
  goods_received: {
    type: Array,
    required: true,
    length: {
      min: 1
    },
    each:{
      product_id: {
        type: String,
        required: true
      },
      unit_quantity: {
        type: Number,
        required: true
      }
    }
  }
})

export { shipments }