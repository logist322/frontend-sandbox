Feature: Display video and play audio of a partner participant and prewiev the published video

  ##### First room enters
  Scenario: partners input correct data
    Given Opened login form
    When input in RoomID call
    Then there is call in RoomID
    When input in UserID Bob
    Then there is Bob in UserID
    When press join button
    Then redirect into room

    ##### Second room enters
    When open new tab
    When input in RoomID call
    Then there is call in RoomID
    When input in UserID Alice
    Then there is Alice in UserID
    When press join button
    Then redirect into room

    ##### Second room checking connection
    When wait 5s
    Then appear local video in second room
    And appear remote video in second room

    ##### First room checking connection
    When switch to the 1 tab
    Then appear local video in first room
    And appear remote video in first room
