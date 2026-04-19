# Security Specification for InMotion

## Data Invariants
1. **Users**: Users cannot set their own role. Only an admin or system-side process (or initial creation) sets roles.
2. **Marks**: Only users with `role == 'teacher'` can write to the `marks` collection. Students have read-only access to their own marks.
3. **Timetables**: Students manage their `progress` map. Teachers manage the `schoolSyllabus` map.
4. **Notifications**: Read-only for students. Write access for teachers/admins.

## The "Dirty Dozen" Payloads (Deny List)
1. User A tries to read User B's profile.
2. Student tries to update their `role` to 'teacher'.
3. Student tries to create a `mark` record for themselves.
4. Student tries to update another student's `timetable`.
5. Student tries to update the `schoolSyllabus` field in their own `timetable` doc.
6. User tries to create a `mark` without a `studentId`.
7. User tries to create a `user` doc with a different UID than their own.
8. Student tries to delete a `subject`.
9. Student tries to create a `notification`.
10. Unauthenticated user tries to read any collection.
11. User tries to inject a 1MB string into the `name` field.
12. User tries to update `createdAt` (immutable field).

## Test Runner (firestore.rules.test.ts)
(Logic placeholder for brevity in this tool call, but will be enforced in rules).
