/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const resources = require('./resources.js');

const FaqIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FaqIntent');
  },
  handle(handlerInput) {
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotvalues_notresolved = getSlotValues(filledSlots);
    const content = slotvalues_notresolved.content.resolved;

    let speechReponse = '';
    let cardTitle = '';
    let cardSubTitle = '';
    let backgroundImage;

    if (content === undefined) {
      // start case
      speechReponse = resources.intro.greeting;
      cardTitle = resources.intro.title;
      cardSubTitle = resources.intro.subtitle;
    } else {
      let questionKey = resources.phraseToQuestion[content];
      let response = resources[questionKey];

      if (response === undefined) {
        speechReponse = resources.prompts.speech_error;
      } else {
        speechReponse = response;
      }
    }

    return handlerInput.responseBuilder
      .speak(speechReponse)
      .reprompt(resources.prompts.default_reprompt)
      .addElicitSlotDirective('content')
      .withSimpleCard(cardTitle, cardSubTitle)
      .getResponse();
  }
}

const PlayVideoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'PlayVideoIntent');
  },
  handle(handlerInput) {
    if (supportsDisplay(handlerInput)) {

      let backgroundImage = new Alexa.ImageHelper()
        .withDescription(resources.background.TITLE)
        .addImageInstance(resources.background.BACKGROUND_IMAGE_URL)
        .getImage();

      let primaryText = new Alexa.RichTextContentHelper()
        .withPrimaryText(resources.background.TEXT)
        .getTextContent();

      let myTemplate = {
        type: 'BodyTemplate1',
        token: 'Welcome',
        backButton: 'HIDDEN',
        backgroundImage: backgroundImage,
        title: resources.background.TITLE,
        textContent: primaryText,
      }

      handlerInput.responseBuilder
        .addVideoAppLaunchDirective(resources.background.VIDEO_URL, resources.background.VIDEO_TITLE, resources.background.VIDEO_SUBTITLE)
        .addRenderTemplateDirective(myTemplate)
        .withSimpleCard(resources.background.TITLE, resources.background.VIDEO_SUBTITLE);

    } else {
      handlerInput.responseBuilder
        .withSimpleCard(resources.background.TITLE, resources.prompts.device_requirement_text)
        .speak(resources.prompts.device_requirement_voice)
        .getResponse();
    }

    return handlerInput.responseBuilder
      .getResponse();

  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill just plays a video when it is started. It does not have any additional functionality.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const AboutIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is a video app starter template.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    PlayVideoIntentHandler,
    AboutIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FaqIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
