/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import { useCallback } from 'react';
import { List, THEME_CONSTANTS } from '@web-stories-wp/design-system';

/**
 * Internal dependencies
 */
import { useStory } from '../../../app';
import {
  PRIORITY_COPY,
  ASPECT_RATIO_LEFT,
  ASPECT_RATIO_RIGHT,
} from '../constants';
import { states, useHighlights } from '../../../app/highlights';
import { ChecklistCard, ChecklistCardStyles } from '../../checklistCard';
import { hasNoFeaturedMedia } from '../utils';
import { useRegisterCheck } from '../countContext';

export function storyPosterAspectRatio(story) {
  if (
    hasNoFeaturedMedia(story) ||
    !story.featuredMedia?.width ||
    !story.featuredMedia?.height
  ) {
    return false;
  }

  const hasCorrectAspectRatio =
    Math.abs(
      story.featuredMedia.width / story.featuredMedia.height -
        ASPECT_RATIO_LEFT / ASPECT_RATIO_RIGHT
    ) <= 0.001;

  return !hasCorrectAspectRatio;
}

const StoryPosterAspectRatio = () => {
  const { story } = useStory(({ state }) => state);
  const setHighlights = useHighlights(({ setHighlights }) => setHighlights);
  const handleClick = useCallback(
    () =>
      setHighlights({
        highlight: states.POSTER,
      }),
    [setHighlights]
  );
  const { footer, title } = PRIORITY_COPY.storyPosterWrongRatio;

  const isRendered = storyPosterAspectRatio(story);
  useRegisterCheck('StoryPosterAspectRatio', isRendered);
  return (
    isRendered && (
      <ChecklistCard
        title={title}
        titleProps={{
          onClick: handleClick,
        }}
        footer={
          <ChecklistCardStyles.CardListWrapper>
            <List size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.X_SMALL}>
              {footer}
            </List>
          </ChecklistCardStyles.CardListWrapper>
        }
      />
    )
  );
};

export default StoryPosterAspectRatio;
