import { ResourceModel } from "../models/resource_model.js";
import { resourceValidator } from "../validators/user_validator.js";

// Add a resource
export const addResource = async (req, res) => {
    try {
        // Validate request
        const {value, error} = resourceValidator.validate(req.body);
        if(error) {
            return res.status(400).json(error);
        }
    
        // Create resource
        const resource = await ResourceModel.create({
            ...value,
            createdBy: req.user.id
        });
    
        await resource.save();
        res.status(201).json(resource)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// Function to get all resources
export const getResources = async (req, res) => {
    try {
        const resources = await ResourceModel.find();
        res.status(200).json(resources)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Function to get a resource by id
export const getResourceById = async (req, res) => {
    try {
        const resource = await ResourceModel
        .findById(req.params.id)
        .populate('createdBy', 'firstName lastName');
    
        if(!resource) {
            return res.status(404).json({
                message: 'Resource not found'
            })
        }
        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Function to update resource
export const updateResource = async (req, res) => {
    try {
        // Validate request
        const {value, error} = resourceValidator.validate(req.body);
        if(error) {
            return res.status(400).json(error);
        }
    
        // Find resource by id
        const resource = await ResourceModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!resource) {
            return res.status(404).json({message: 'Resource not found'})
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Function to delete resource
export const deleteResource = async (req, res) => {
    try {
        const resource = await ResourceModel.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({message: 'Resource not found'})
        }
        res.status(200).json({message: 'Resource deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}