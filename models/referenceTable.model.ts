import {District} from "../frontend/src/redux/districts/state"

export interface ReferenceTable{

    districts: District[],
    serviceTypes
        { id: number; type: string }[], // service types
        {
            id: number
            type: string
            service_type_id: number
            subtype: string
        } // service subtypes

}