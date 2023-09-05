import { createHandler, Body, Post } from "next-api-decorators"
import { updateUserCre8orNumber } from "../../../../../../helpers/userProfile.db"
import { UpdateCre8orNumberDTO } from "../../../../../../DTO/updateCre8orNumber.dto"

class UpdateCre8orNumber {
  @Post()
  async updateCre8orNumber(
    @Body()
    body: UpdateCre8orNumberDTO,
  ) {
    const result = await updateUserCre8orNumber(body)
    return result
  }
}

export default createHandler(UpdateCre8orNumber)
