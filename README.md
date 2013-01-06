random-projects
===============
 This function was created to solve a problem  posed to 5th graders at 
 my daughter's elementary school. 
 The problem is: given the numbers 1_2_3_4_5_6_7_8_9 and the operators {+, -, *, /},
 can some combination of operators be put where the underscores are such that the 
 after calculating in accordance with standard operator precedence rules (P.E.M.D.A.S)
 the result is exactly 100?

 Many kids were frustrated by this problem, and many others found the most common (I'm guessing)
 solution which involves 7 of one operator and 1 of another.

 I wanted to find all of the solutions to every combination of operators and then I can use grep
 on the output to find the 15 solutions out of 65,000+ that equal precisely 100.

 The exact number of solutions to the original problem is 4^8, that is, 4 operators to the power of 
 8 "gaps" between the numbers 1-9. The numbers themselves never change position or value, so that's it.
 4 to the eighth power is 65536.

 The function is parameterized so that you can enter an array of 2 or more numbers and an array of 1 or more operators
 as quoted strings.

 My quick and dirty strategy was to form all of the possbile strings which represented the 65K+ options
 and then let js eval them all to give me the answers. I spew the results out on the stdout so the 
 results can be captured in a file or piped to grep etc for analysis.
