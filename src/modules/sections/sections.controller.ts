import { Controller } from "@nestjs/common";
import SectionsService from "./sections.service";

@Controller(`/api/sections`)
class SectionsController {
    constructor(
        private readonly service: SectionsService
    ) { }
    public getAllSections() {
        return this.service.getAll()
    }
}
export default SectionsController;