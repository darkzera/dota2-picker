import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import Organizer from "@src/models/organizer";
import User from "@src/models/user";
import { ValidationError, NotFoundError } from "objection";
import { PlayList } from "@src/services/playlist";
import { ClientRequestError } from "@src/clients/OpenDota";

// const taken = await Organizer.query().where('userId', org[0].userId); // shouldnt be in User service? / get org from user
// const attached = await playListService.processMoviesForCompliledByName(taken);

@Controller('organizer')
export class PlayListController {

    @Post('')
    public async createOrganizer(req: Request, res: Response): Promise<Response> {
        const org: Organizer[] = [];
        org.push(req.body)
        // this shuld be in service, not controller
        try {
            const organizerAdded = await User.relatedQuery('organizers')
                .for(org[0].userId)
                .insert(org);

            return res.status(201).json({
                ...organizerAdded[0]
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(422).json({
                    error: error.message
                })
            }
            else if (error instanceof NotFoundError) {
                return res.status(500).json({
                    error: error.message
                })
            }

            return res.status(500).json({
                error: "Could not catch what error it is"
            })
        }

    }

    @Post('loadOrgMovies')
    public async loadOrganizerMovies(req: Request, res: Response): Promise<Response> {
        const userId = req.body.userId;
        
        try {
            const organizersFromUser = await Organizer.query().where('userId', userId);
            const playlistService = new PlayList();
            const attached = await playlistService.processMoviesForCompliledByName(organizersFromUser);
            return res.status(200).json(attached);

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(406).json({
                    error: error.message
                });
            }
            else if (error instanceof NotFoundError) {
                return res.status(404).json({
                    error: error.message
                });
            }
            else if (error instanceof ClientRequestError) { 
                return res.status(333).json({error: error})
            }

            return res.status(501).json({
                error: "Could not catch what error it is" + error
            })

        }
    }




}