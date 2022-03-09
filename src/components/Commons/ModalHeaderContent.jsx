import styles from './modalHeaderContent.module.css';

const ModalHeaderContent = ({ header, content, image }) => (
  <div className={styles.container}>
    <Grid columns={image ? 2 : 1}>
      <Grid.Row verticalAlign={'middle'}>
        {image && <Grid.Column width='5'>{image}</Grid.Column>}
        <Grid.Column width='11'>
          <Header as='h2'>{header}</Header>
          {content}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default ModalHeaderContent;
