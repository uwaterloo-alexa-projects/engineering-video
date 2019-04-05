
// loading screen
exports.background = {
    BACKGROUND_IMAGE_URL : 'https://s3.amazonaws.com/cdn.dabblelab.com/img/echo-show-bg-blue.png',
    VIDEO_URL : 'https://s3.amazonaws.com/videoengineering/Educating+the+Engineer+of+the+Future+Campaign+-+Together+We+Did+This.mp4',
    VIDEO_TITLE : "Video from pixabay.com",
    VIDEO_SUBTITLE : "Used under Creative Commons.",
    TITLE : 'Visual Escape',
    TEXT : 'A 60-second virtual vacation for your brain. Please relax before the video loads.'
} 

exports.prompts = {
    device_requirement_text : "This skill requires a device with the ability to play videos.",
    device_requirement_voice : "The video cannot be played on your device. To watch this video, try launching this skill from an echo show device.",
    default_reprompt : "Anything else I can help with? If not, say close to exit this skill",
    speech_error : "Sorry. I could not understand the question. Please try again."
}

exports.intro = {
    greeting : "Welcome to the UW Systems Design Engineering Open House Skill. I can answer some frequently asked questions. What would you like to ask me?",
    title : "Waterloo Systems Design Engineering FAQ",
    subtitle : "Ask me anything!"
}

// TODO: we need a way to map phrases to questions
exports.phraseToQuestion = {
    "What is Systems" : "what-syde"
}

exports.questionToAnswer = {
    "what-syde" : "Systems Design Engineering is an interdisciplinary engineering program at the University of Waterloo"
}

