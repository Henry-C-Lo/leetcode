/*

Given a string s that consists of only uppercase English letters, you can perform at most k operations on that string.

In one operation, you can choose any character of the string and change it to any other uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after performing the above operations.

Note:
Both the string's length and k will not exceed 104.

  Example 1:

  Input:
  s = "ABAB", k = 2

  Output:
  4

  Explanation:
  Replace the two 'A's with two 'B's or vice versa.


  Example 2:

  Input:
  s = "AABABBA", k = 1

  Output:
  4

  Explanation:
  Replace the one 'A' in the middle with 'B' and form "AABBBBA".
  The substring "BBBB" has the longest repeating letters, which is 4.


 Input:  @param {string} s
         @param {number} k
 Output: @return {number}

*/

var characterReplacement = function (s, k) {
  let left = 0, right = 0, maxCharCount = 0;
  let visited = {};

  while (right < s.length) {
    let char = s[right];
    visited[char] = visited[char] ? visited[char] + 1 : 1;

    if (visited[char] > maxCharCount) {
      maxCharCount = visited[char];
    }

    if (right - left + 1 - maxCharCount > k) {
      visited[s[left]]--;
      left++;
    }

    right++;
  }

  return right - left;
};

/*
sliding window method

Maintain left and right pointer, max instances of a single char, and visit counts for each char.
for each char in string
increment visit count for this char
if new visit count is higher than max, update max
if length of current string without max char count is greater than k,
then we know the new char made it such that there are more chars missing than can be replaced by k,
so we will remove the first char
and increment left pointer
increment right pointer to look at next char.
In the end, the answer is whatever the window size is. This is because we never shrink the window size.
As we look at new chars, we increase the window size.
Once we see we can no longer increase due to limitation of k, we slide the window forward.
In these inbetween states, it's possible the window doesn't span a valid subset,
but that doesn't matter because the window size at one point did span a valid set.
Instead, we wait until there's a possibility of a better set, which is when there is a substring with more instances of some char.
*/