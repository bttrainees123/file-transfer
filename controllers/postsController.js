import PostCard from '../models/postModel.js'


//create post
export const createPost = async(req,res)=>{
    try {
         const {title,description } = req.body
//image path 
         const imagePath =req.file ? req.file.path :null;
    const newPost = new PostCard({title,description,imageURL:imagePath});
    await newPost.save();
    console.log(newPost)
     return res.status(200).json({status:true,message:"post is created"})
    } catch (error) {
        console.log(error)
       return res.status(500).send({
            success:false,
            message:'Failed to create the post'
        })
    }
   
}
// Get posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch posts' });
    }
};

// Get post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        return res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch post' });
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        return res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to update post' });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to delete post' });
    }
};
