import { SupportGroupModel } from "../models/supportGroup_model.js";
import { UserModel } from "../models/user_model.js";
import { supportGroupValidator } from "../validators/user_validator.js";


export const addGroup = async (req, res) => {
    try {
        // Validate request
        const { value, error } = supportGroupValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        // Fetch the logged-in user's details to get the facilitator's name
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "Facilitator not found" });
        }

        // Create resource
        const supportGroup = await SupportGroupModel.create({
            ...value,
            facilitator: user.id,
            facilitatorName: `${user.firstName} ${user.lastName}`
        });

        await supportGroup.save();
        res.status(201).json({ supportGroup: supportGroup })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

export const getGroups = async (req, res) => {
    try {
        const groups = await SupportGroupModel.find();
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getGroupById = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel
            .findById(req.params.id)
            .populate('facilitator', 'firstName lastName email')
            .populate('members', 'firstName lastName email');

        if (!supportGroup) {
            return res.status(404).json({
                message: 'Support group not found'
            })
        }
        res.status(200).json(supportGroup)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateGroup = async (req, res) => {
    try {
        // Validate request
        const { value, error } = supportGroupValidator.validate(req.body);
        if (error) {
            return res.status(400).json(error.message);
        }

        // Find resource by id
        const supportGroup = await SupportGroupModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!supportGroup) {
            return res.status(404).json({ message: 'Support group not found' })
        }
        res.status(200).json(supportGroup);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findByIdAndDelete(req.params.id);
        if (!supportGroup) {
            return res.status(404).json({ message: 'Support group not found' })
        }
        res.status(200).json({ message: 'Support group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const joinGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findById(req.params.id);
        if (!supportGroup) {
            return res.status(404).json({ message: 'Support group not found' })
        }

        if (supportGroup.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'User is already a member' })
        }

        if (supportGroup.members.length >= supportGroup.capacity) {
            return res.status(400).json({ message: 'Support group is full' })
        }

        supportGroup.members.push(req.user.id);
        await supportGroup.save();
        res.json({
            message: 'You have been added to this support group',
            supportGroup
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findById(req.params.id)
        if (!supportGroup) {
            return res.status(404).json({ message: 'Support group not found' })
        }

        if (!supportGroup.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'User is not a member of this group' })
        }

        supportGroup.members = supportGroup.members.filter(member => member.toString() !== req.user.id.toString());
        await supportGroup.save();
        res.json({
            supportGroup,
            message: 'You have been successfully removed from this group'
        });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Get support groups by user email
export const supportGroupByEmail = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();

        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with the specified email" });
        }

        // Find requests by user ID
        const userGroups = await SupportGroupModel.find({ members: user._id });

        if (!userGroups.length) {
            return res.status(404).json({ message: "No support groups found for the specified email" });
        }

        console.log("User email:", email);
        console.log("User found:", user);
        console.log("User ID (type):", typeof user._id);
        console.log("User ID:", user._id);

        res.status(200).json({ supportGroups: userGroups });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};
