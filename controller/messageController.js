import Messages from "../model/message.js";

export const getMessages = async (req, res, next) => {
    try {
        const result = await Messages.findAll();
        res.render('new-message', {
            title: 'Home',
            post: result.rows,
            user: req.user,
            success_msg: req.flash('success'),   // ✅ fixed key
            error_msg: req.flash('error')
        });
    } catch (err) {
        next(err);
    }
};

export const postMessage = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            req.flash('error', 'Title and content required');
            return res.redirect('/messages/new');   // ✅ added return
        }

        await Messages.create({
            title,
            content,
            authorId: req.user.id   // ✅ ensures authorId is set
        });

        req.flash('success', 'Message posted successfully');
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

export const deleteMessages = async (req, res, next) => {
    try {
        const { id } = req.params;   // ✅ extract id from route
        await Messages.deleteById(id);
        req.flash('success', 'Message deleted');
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};