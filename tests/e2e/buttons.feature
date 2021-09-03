Feature: Ability to enable/disabled published video/audio

  ##### Enter the room
  Scenario Outline: partners click buttons
    Given Opened login form
    When input in RoomID call
    And input in UserID Bob
    And press join button

    And open new tab
    And input in RoomID call
    And input in UserID Alice
    And press join button

    And wait 5s
    Then appear local video in second room
    And appear remote video in second room

    When switch to the 1 tab
    Then appear local video in first room
    And appear remote video in first room

    ##### First room checking buttons
    When press audio button
    And switch to the 2 tab
    And wait 3s
    Then audio disappear in second room

    When switch to the 1 tab
    And wait 3s
    And press audio button
    And switch to the 2 tab
    And wait 3s
    Then audio appear in second room

    When switch to the 1 tab
    And wait 3s
    And press video button
    And switch to the 2 tab
    And wait 3s
    Then video disappear in second room

    When switch to the 1 tab
    And wait 3s
    And press video button
    And switch to the 2 tab
    And wait 3s
    Then video appear in second room

    ##### Second room checking buttons
    When press audio button
    And switch to the 1 tab
    And wait 3s
    Then audio disappear in second room

    When switch to the 2 tab
    And wait 3s
    And press audio button
    And switch to the 1 tab
    And wait 3s
    Then audio appear in second room

    When switch to the 2 tab
    And wait 3s
    And press video button
    And switch to the 1 tab
    And wait 3s
    Then video disappear in second room

    When switch to the 2 tab
    And wait 3s
    And press video button
    And switch to the 1 tab
    And wait 3s
    Then video appear in second room
