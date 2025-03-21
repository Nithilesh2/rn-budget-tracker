import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TravelIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    color={props.color}
    fill="none"
    {...props}
  >
    <Path
      d="M15 6.5H9C6.17157 6.5 4.75736 6.5 3.87868 7.37868C3 8.25736 3 9.67157 3 12.5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V12.5C21 9.67157 21 8.25736 20.1213 7.37868C19.2426 6.5 17.8284 6.5 15 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 6.5V6C9 4.58579 9 3.87868 9.43934 3.43934C9.87868 3 10.5858 3 12 3C13.4142 3 14.1213 3 14.5607 3.43934C15 3.87868 15 4.58579 15 6V6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 10.5C18.7909 10.5 17 8.70914 17 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9.25 12L8.5 12.75L9.25 13.5L10 12.75L9.25 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 17C5.20914 17 7 18.7909 7 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M3 10.5C5.20914 10.5 7 8.70914 7 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M21 17C18.7909 17 17 18.7909 17 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M14 16.8L12.5 16.5L13.7 15.3L14 16.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.5 11V11.01"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default TravelIcon
