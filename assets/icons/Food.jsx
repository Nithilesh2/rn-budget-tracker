import * as React from "react"
import Svg, { Path } from "react-native-svg"

const FoodIcon = (props) => (
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
      d="M6.5 17.3306C7.78183 18.9563 9.76903 20 12 20C13.9587 20 15.7295 19.1955 17 17.8989M8.5 6.93647C9.52961 6.34088 10.725 6 12 6C13.9587 6 15.7295 6.80446 17 8.10101"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M16 13C16 15.2091 14.2091 17 12 17C9.79085 17 8 15.2091 8 13C8 10.7909 9.79085 9 12 9C14.2091 9 16 10.7909 16 13Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <Path
      d="M6 7C6 8.38067 5.10457 9 4 9C2.89543 9 2 8.38067 2 7C2 5.61928 2.89543 4 4 4C5.10457 4 6 5.61928 6 7Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <Path
      d="M19.5 13V4H20C21.1046 4 22 4.89543 22 6V13H19.5ZM19.5 13V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 9V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default FoodIcon
