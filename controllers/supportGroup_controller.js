import { SupportGroupModel } from "../models/supportGroup_model.js";
import { supportGroupValidator } from "../validators/user_validator.js";


export const addGroup = async (req, res) => {
    try {
        // Validate request
        const {value, error} = supportGroupValidator.validate(req.body);
        if(error) {
            return res.status(400).json({
                error: error.message
            });
        }
    
        // Create resource
        const supportGroup = await SupportGroupModel.create({
            ...value,
            createdBy: req.user.id
        });
    
        await supportGroup.save();
        res.status(201).json({supportGroup: supportGroup})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export const getGroups = async (req, res) => {
    try {
        const groups = await SupportGroupModel.find();
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getGroupById = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel
        .findById(req.params.id)
        .populate('facilitator', 'firstName lastName email')
        .populate('members', 'firstName lastName email');
    
        if(!supportGroup) {
            return res.status(404).json({
                message: 'Support group not found'
            })
        }
        res.status(200).json(supportGroup)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateGroup = async (req, res) => {
    try {
        // Validate request
        const {value, error} = supportGroupValidator.validate(req.body);
        if(error) {
            return res.status(400).json(error.message);
        }
    
        // Find resource by id
        const supportGroup = await SupportGroupModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!supportGroup) {
            return res.status(404).json({message: 'Support group not found'})
        }
        res.status(200).json(supportGroup);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findByIdAndDelete(req.params.id);
        if (!supportGroup) {
            return res.status(404).json({message: 'Support group not found'})
        }
        res.status(200).json({message: 'Support group deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const joinGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findById(req.params.id);
        if (!supportGroup) {
            return res.status(404).json({message: 'Support group not found'})
        }
    
        if (supportGroup.members.includes(req.user.id)) {
            return res.status(400).json({message: 'User is already a member'})
        }
    
        if(supportGroup.members.length >= supportGroup.capacity) {
            return res.status(400).json({message: 'Support group is full'})
        }
    
        supportGroup.members.push(req.user.id);
        await supportGroup.save();
        res.json({
            message: 'You have been added to this support group',
            supportGroup
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const supportGroup = await SupportGroupModel.findById(req.params.id)
        if(!supportGroup) {
            return res.status(404).json({message: 'Support group not found'})
        }
    
        if(!supportGroup.members.includes(req.user.id)) {
            return res.status(400).json({message: 'User is not a member of this group'})
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
