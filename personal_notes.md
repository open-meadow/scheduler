## Notes
#### These are just some personal notes I am keeping to explain or remind myself of certain things

- How does the interviewer changing button work?
<code>props.onChange(singleInterviewer.id)</code> is run whenever the user clicks another interviewer. This sets the value of singleInterviewer to id that was selected. Thus <code>props.value</code> changes, and because <code>selected={singleInterviewer.id === props.value}</code>, the 'selected' class gets added to the new id and removed from the old one

- When to use onClick = {() => handleClick vs onClick} = {handleClick}
() => handleClick(argument) only when there is an argument, otherwise onClick={handleClick} is enough