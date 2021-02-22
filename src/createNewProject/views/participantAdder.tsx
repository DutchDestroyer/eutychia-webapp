import { INewParticipant } from "../contracts/iNewParticipant";

interface ParticipantAdderProps{
    participantState: INewParticipant[],
    participantFirstNameUpdated: (index: number, firstName: string) => void,
     participantLastNameUpdated: (index: number, lastName: string) => void,
      participantEmailAddressUpdated: (index: number, emailAddress: string) => void
  }
  
  
  export function ParticipantAdder(props: ParticipantAdderProps): JSX.Element {
    return<>{ props.participantState.map((participant, index) => {
      return (
        <div key={`participant-${index}`}>
          <label>first name</label>
          <input
            type="text"
            name={participant.firstName}
            data-idx={participant.firstName}
            id={participant.firstName}
            className="firstname"
            onChange={(e) => props.participantFirstNameUpdated(index, e.target.value)} />
          <label>Last name</label>
          <input
            type="text"
            name={participant.lastName}
            data-idx={participant.lastName}
            id={participant.lastName}
            className="lastname"
            onChange={(e) => props.participantLastNameUpdated(index, e.target.value)} />
          <label>email address</label>
          <input
            type="text"
            name={participant.emailAddress}
            data-idx={participant.emailAddress}
            id={participant.emailAddress}
            className="emailAddress"
            onChange={(e) => props.participantEmailAddressUpdated(index, e.target.value)} />
          {participant.isCorrect ? null : <label>Participant is incorrect</label>}
        </div>
        );
        })
    }</>
  }