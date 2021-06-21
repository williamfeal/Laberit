export class EntityModel {
    description: string;
    id: string;
    name: string;
    status: boolean
    
    constructor(description?: string, id?: string, name?: string, status?: boolean) {
        this.description = description;
        this.id = id;
        this.name = name;
        this.status = status;
      }
}
