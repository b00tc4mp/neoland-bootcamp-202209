const IS_ALPHABETICAL_REGEX = /^[a-zA-Z() ]+$/
const IS_EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const HAS_NO_SPACES_REGEX = /^\S*$/
const HAS_SPACES_REGEX = /\s/
//var IS_NUMERICAL_PHONE_REGEX = /^\+\d{2,3}\s\d{9}$/

export {
    IS_ALPHABETICAL_REGEX,
    IS_EMAIL_REGEX,
    HAS_NO_SPACES_REGEX,
    HAS_SPACES_REGEX
}
