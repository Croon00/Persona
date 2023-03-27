package com.ssafy.project.common.db.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentDTO {
    private Long id;

    private String userProfile;

    private String nickname;

    private String content;

    private int commentLikes;

    private LocalDateTime createdDate;

}
