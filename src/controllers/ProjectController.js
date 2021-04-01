const knex = require('../database')

module.exports = {
    async index (req, res, next) {
        try {
            const { user_id, page = 1 } = req.query

            const query = knex('projects')
            .limit(5)
            .offset((page - 1) * 5)

            const queryCount = knex('projects').count()


            if (user_id) {
                query
                .select('projects.*', 'users.username')
                .join('users', 'users.id', '=', 'projects.user_id')
                .where({ user_id })
                .where('users.deleted_at', null)

                queryCount
                .where({ user_id })
            }

            const [count] = await queryCount

            res.header('X-Total-Count', count["count"])

            const results = await query
            
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create (req, res, next) {
        try {
            const { title, user_id } = req.body

            await knex('projects').insert({ 
                title, 
                user_id 
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
}