import React from 'react';
import {Button, Container, Header, Input, Popup} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Redirect} from 'react-router-dom';
import {getCreatedNewdle} from '../../selectors';
import styles from './CreationSuccessPage.module.scss';

export default function CreationSuccessPage() {
  const newdle = useSelector(getCreatedNewdle);
  const history = useHistory();

  if (!newdle) {
    return <Redirect to="/new" />;
  }

  const handleSummaryClick = () => {
    history.push(`/newdle/${newdle.code}/summary`);
  };

  return (
    <Container text>
      <Header as="h1" className={styles['newdle-title']}>
        {newdle.title}
      </Header>
      <div className={styles['success-message']}>
        <Header as="h3" className={styles['header']}>
          Done!
        </Header>
        {newdle.participants.length !== 0 ? (
          <p>
            Your Newdle was created and invitation e-mails have been sent. You can send the
            following link to everyone you would like to invite:
          </p>
        ) : (
          <p>
            Your Newdle was created. You can now send the following to everyone you would like to
            invite:
          </p>
        )}
        <Input
          className={styles['newdle-link']}
          fluid
          readOnly
          value={newdle.url}
          onFocus={evt => {
            evt.target.select();
          }}
          action={
            navigator.clipboard && (
              <Popup
                content="Copied!"
                on="click"
                position="top center"
                inverted
                trigger={
                  <Button
                    icon="copy"
                    title="Copy to clipboard"
                    onClick={() => navigator.clipboard.writeText(newdle.url)}
                  />
                }
              />
            )
          }
        />
      </div>
      <div className={styles['summary-button']}>
        <Button color="teal" onClick={handleSummaryClick}>
          Go to Newdle summary!
        </Button>
      </div>
    </Container>
  );
}
