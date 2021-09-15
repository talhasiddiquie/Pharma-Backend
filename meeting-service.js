
const _MEETINGS = [
    {
        meetingId: "",
        users: [],
        initiator: null,
        currentSlideId: null,
        startTime: null,
        entTime: null,
    },
    {
        meetingId: "",
        users: [],
        initiator: null,
        currentSlideId: null,
        startTime: null,
        entTime: null,
    },
    {
        meetingId: "",
        users: [],
        initiator: null,
        currentSlideId: null,
        startTime: null,
        entTime: null,
    }
];

const getMeetingById = (id) => {
    return _MEETINGS.find(meeting => meeting.meetingId == id);
}

module.exports = { getMeetingById }
