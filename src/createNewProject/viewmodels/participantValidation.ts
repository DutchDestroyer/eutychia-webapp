import { INewParticipant } from "../contracts/iNewParticipant"

export function incorrectParticipants(participants: INewParticipant[]): number[] {
    participants.forEach(p =>{
      p.isCorrect = !(!completeRowIsEmpty(p) && !completeRowCorrect(p))
    })
  
    return participants.map((p, index) => !p.isCorrect ? index : -1).filter(p => p > -1)
  }
  
 function completeRowIsEmpty(p: INewParticipant): Boolean {
    return p.emailAddress?.trim().length === 0 &&
     p.firstName?.trim().length === 0 &&
     p.lastName?.trim().length === 0
  }
  
function completeRowCorrect(p: INewParticipant): Boolean {
    
    let isValidFirstName = p.firstName.trim().length !== 0 && !/[^a-zA-Z]/.test(p.firstName)
    let isValidLastName = p.lastName.trim().length !== 0  && !/[^a-zA-Z]/.test(p.lastName)
    let isValidEmailAddress = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$").test(p.emailAddress)
    return isValidFirstName && isValidLastName && isValidEmailAddress
  }