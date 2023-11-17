import User from "../../models/user.js"

const getAllUsers = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1; // current page number
        const limit = parseInt(req.query.limit) || 20; // items per page
        const skip = (page - 1) * limit;

        // Define filter criteria
        const filterCriteria = {
            ...(req.query.domain && { domain: req.query.domain }),
            ...(req.query.gender && { gender: req.query.gender }),
            ...(req.query.available !== undefined && { available: req.query.available === 'true' })
        };

        const searchCriteria = {};

        if (req.query.search) {
            searchCriteria.$or = [
                { first_name: { $regex: req.query.search, $options: 'i' } },
                { last_name: { $regex: req.query.search, $options: 'i' } },
            ];
        }

        const combinedCriteria = { ...filterCriteria, ...searchCriteria };

        const users = await User.find(combinedCriteria)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalUsers = await User.countDocuments(combinedCriteria);
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users,
            page,
            totalPages,
            totalUsers,
        });
    } catch (err) {
        next(err)
    }
}


export default getAllUsers