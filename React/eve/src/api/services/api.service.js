import axiosInstance from '../axios';

class APIDataService {
    createUser(body) {
        return axiosInstance.post(`/auth/register/`, body).then(response => {
            return response;
            
        }).catch(err => {
            if(err.response.status === 400 && err.response.data.email !== undefined) {
                return Error("A user with this email already exists.")
            } else if(err.response.status === 400 && err.response.data.username !== undefined) {
                return Error("A user with this username already exists.")
            } else {
                return Error("An unknown error occurred. Please try again later.")
            }
        })
    }
    getEvents(groupID) {
        return axiosInstance.get(`/groups/${groupID}/events/`).then(response => {
            return Error("Server-side error");
        })
    }

    getEvent(groupID, eventID) {
        return axiosInstance.get(`/groups/${groupID}/events/${eventID}/`).then(response => {
            return response.data;
        })
    }
    createEvent(groupID, data) {
        return axiosInstance.post(`/groups/${groupID}/events/`, data)
    }
    updateEvent(groupID, eventID, data) {
        return axiosInstance.put(`/groups/${groupID}/events/${eventID}/`, data)
    }

    deleteEvent(groupID, eventID) {
        return axiosInstance.delete(`/groups/${groupID}/events/${eventID}/`)
    }

    createGroup(body) {
        return axiosInstance.post(`/groups/`, body).then(response => {
            return response.data;
        })
    }

    updateGroup(groupID, body) {
        return axiosInstance.put(`/groups/${groupID}/`, body)
    }
    deleteGroup(groupID) {
        return axiosInstance.delete(`/groups/${groupID}/`)
    }

    getGroups() {
        return axiosInstance.get("/groups/").then(response => {
            return response.data;
        }).catch(err => {
            const request = err.config;
            return axiosInstance(request);
        })
    }

    getGroup(groupID) {
        return axiosInstance.get(`/groups/${groupID}/`).then(response => {
            return response.data;
        })
    }

    getGroupMembers(groupID) {
        return axiosInstance.get(`/groups/${groupID}/members/`).then(response => {
            return response.data;
        })
    }
    getGroupMember(groupID, memberID) {
        return axiosInstance.get(`/groups/${groupID}/members/${memberID}/`).then(response => {
            return response.data;
        })
    }
    updateGroupMember(groupID, memberID, body) {
        return axiosInstance.patch(`/groups/${groupID}/members/${memberID}/`, body)
    }
    findMembership(groupID, userID) {
        return axiosInstance.get(`/groups/${groupID}/find/${userID}/`).then(response => {
            return response.data
        })
    }

    verifyInviteCode(data) {
        return axiosInstance.post(`/invite-codes/verify/`, data).then(response => {
            return response.data;
        }).catch(err => {
            if (err.response.status === 404) {
                return Error("Code not found.")
            } else if (err.response.status === 409) {
                return Error("You are already a member of this group.")
            } else if (err.response.status === 410) {
                return Error("Code has expired.")
            } else {
                return Error("An unknown error occurred.")
            }
        })

    }

    addGroupMember(data) {
        return axiosInstance.post(`/join-group/`, data).then(response => {
            return response.data;
        })
    }
    deleteMember(groupID, memberID) {
        return axiosInstance.delete(`/groups/${groupID}/members/${memberID}/`)
    }

    submitConflict(groupID, data) {
        return axiosInstance.post(`/groups/${groupID}/conflicts/`, data)
    }

    getConflicts(groupID) {
        return axiosInstance.get(`/groups/${groupID}/conflicts/`).then(response => {
            return response.data;
        })
    }

    getTopics(groupID) {
        return axiosInstance.get(`/groups/${groupID}/topics/`).then(response => {
            return response.data;
        })
    }

    getTopic(groupID, topicID) {
        return axiosInstance.get(`/groups/${groupID}/topics/${topicID}/`).then(response => {
            return response.data;
        })
    }

    deleteTopic(groupID, topicID) {
        return axiosInstance.delete(`/groups/${groupID}/topics/${topicID}/`)
    }

    updateConflict(groupID, conflictID, data) {
        return axiosInstance.patch(`/groups/${groupID}/conflicts/${conflictID}/`, data);
    }

    getInviteCodes(groupID) {
        return axiosInstance.get(`/groups/${groupID}/invite-codes/`).then(response => {
            return response.data;
        })
    }

    deleteInviteCode(groupID, codeID) {
        return axiosInstance.delete(`/groups/${groupID}/invite-codes/${codeID}/`)
    }
    createInviteCode(groupID) {
        return axiosInstance.post(`/groups/${groupID}/invite-codes/`, { group: groupID }).then(response => {
            return response.data;
        });
    }
}

export default new APIDataService();