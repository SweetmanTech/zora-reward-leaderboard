import { error } from "console"
import { Get, Query, createHandler } from "next-api-decorators"
import getAllIndexedData from "../../../../lib/getIndexedData"

class IndexedData {
  @Get()
  async index(@Query("days") days: number) {
    try {
      const results = await getAllIndexedData(days)
      return results
    } catch (e) {
      error(e)
      return e
    }
  }
}

export default createHandler(IndexedData)
