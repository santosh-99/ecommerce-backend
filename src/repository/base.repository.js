class BaseRepository {
    constructor(model) {
        this.model = model;

    }

    async create(data) {
        return this.model.create(data);
    }

    async findAll(filter = {}) {
        return this.model.find(filter);
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async findOne(filter) {
        return this.model.findOne(filter);
    }

    async findByIdAndUpdate(id, data) {
        return this.model.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );
    }

    async findByIdAndDelete(id) {
        return this.model.findByIdAndDelete(id);
    }







}

export default BaseRepository;
